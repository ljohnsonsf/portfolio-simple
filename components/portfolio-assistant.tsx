"use client";

import {
  ArrowUp,
  CornerDownRight,
  Info,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  isHomeView,
  resolveAssistantPage,
  type HomeView,
} from "@/lib/portfolio-assistant/context";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type FailedRequest = {
  message: string;
  history: ChatMessage[];
};

type AssistantResponse = {
  reply?: string;
  error?: string;
};

const sessionResetMs = 30 * 60 * 1000;
const maxInputLength = 800;
const workViewEventName = "lauren-portfolio-work-view-change";
const launcherPositionStorageKey = "lauren-ai-launcher-y";
const launcherViewportMargin = 12;
const approvedEmail = "ljjsantafe@gmail.com";
const approvedUrls = [
  "https://laurjo.com/",
  "https://www.linkedin.com/in/ljohnsonsf/",
  "https://drive.google.com/file/d/1jGtgokz3a2YHvUbqenRGkmxG0NlBB7CW/view?usp=sharing",
  "https://frequency-finder.vercel.app/",
  "https://monetgallery.vercel.app/",
];

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isApprovedUrl(value: string) {
  return approvedUrls.some((url) => value.startsWith(url));
}

function renderMessageText(content: string) {
  const tokenPattern = /(https?:\/\/[^\s<>)]+|ljjsantafe@gmail\.com)/g;
  const lines = content.split("\n");

  return lines.map((line, lineIndex) => {
    const parts = line.split(tokenPattern);

    return (
      <Fragment key={`${line}-${lineIndex}`}>
        {parts.map((part, partIndex) => {
          if (part === approvedEmail) {
            return (
              <a href={`mailto:${approvedEmail}`} key={`${part}-${partIndex}`}>
                {part}
              </a>
            );
          }

          if (part.startsWith("https://") && isApprovedUrl(part)) {
            return (
              <a
                href={part}
                key={`${part}-${partIndex}`}
                rel="noreferrer"
                target="_blank"
              >
                {part}
              </a>
            );
          }

          return <Fragment key={`${part}-${partIndex}`}>{part}</Fragment>;
        })}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </Fragment>
    );
  });
}

function getInitialHomeView(): HomeView {
  if (typeof document === "undefined") {
    return "case-studies";
  }

  const view = document.documentElement.dataset.workView;

  return isHomeView(view) ? view : "case-studies";
}

function clampLauncherPosition(position: number, launcherHeight: number) {
  const minimum = launcherHeight / 2 + launcherViewportMargin;
  const maximum = Math.max(
    minimum,
    window.innerHeight - launcherHeight / 2 - launcherViewportMargin,
  );

  return Math.min(maximum, Math.max(minimum, position));
}

export function PortfolioAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [homeView, setHomeView] = useState<HomeView>("case-studies");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedRequest, setFailedRequest] = useState<FailedRequest | null>(null);
  const [launcherY, setLauncherY] = useState<number | null>(null);
  const [isDraggingLauncher, setIsDraggingLauncher] = useState(false);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const latestMessageRef = useRef<HTMLDivElement | null>(null);
  const launcherDragRef = useRef<{
    pointerId: number;
    startPointerY: number;
    startLauncherY: number;
  } | null>(null);
  const launcherPositionRef = useRef<number | null>(null);
  const suppressLauncherClickRef = useRef(false);

  const pageContext = useMemo(
    () => resolveAssistantPage(pathname, homeView),
    [homeView, pathname],
  );

  const starterQuestions = pageContext.starters;

  useEffect(() => {
    const launcher = launcherRef.current;

    if (!launcher) {
      return;
    }

    const storedPosition = Number.parseFloat(
      window.localStorage.getItem(launcherPositionStorageKey) ?? "",
    );
    const nextPosition = clampLauncherPosition(
      Number.isFinite(storedPosition) ? storedPosition : window.innerHeight / 2,
      launcher.offsetHeight,
    );

    launcherPositionRef.current = nextPosition;
    setLauncherY(nextPosition);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const launcher = launcherRef.current;

      if (!launcher || launcherPositionRef.current === null) {
        return;
      }

      const nextPosition = clampLauncherPosition(
        launcherPositionRef.current,
        launcher.offsetHeight,
      );

      launcherPositionRef.current = nextPosition;
      setLauncherY(nextPosition);
      window.localStorage.setItem(
        launcherPositionStorageKey,
        String(nextPosition),
      );
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setHomeView(getInitialHomeView());

    const handleWorkViewChange = (event: Event) => {
      const detail = (event as CustomEvent<{ view?: unknown }>).detail;

      if (isHomeView(detail?.view)) {
        setHomeView(detail.view);
      }
    };

    window.addEventListener(workViewEventName, handleWorkViewChange);

    return () => {
      window.removeEventListener(workViewEventName, handleWorkViewChange);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/" || pathname === "/work") {
      setHomeView(getInitialHomeView());
    }
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("portfolio-assistant-open", isOpen);

    return () => {
      document.body.classList.remove("portfolio-assistant-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusTarget = textareaRef.current ?? closeButtonRef.current;
    window.setTimeout(() => focusTarget?.focus(), 0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        window.setTimeout(() => launcherRef.current?.focus(), 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [isSending, messages]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setMessages([]);
      setError(null);
      setFailedRequest(null);
    }, sessionResetMs);

    return () => window.clearTimeout(timeout);
  }, [messages]);

  const openAssistant = () => {
    if (suppressLauncherClickRef.current) {
      suppressLauncherClickRef.current = false;
      return;
    }

    setIsOpen(true);
  };

  const handleLauncherPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (
      event.button !== 0 ||
      window.matchMedia("(max-width: 720px)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const currentPosition = bounds.top + bounds.height / 2;

    launcherDragRef.current = {
      pointerId: event.pointerId,
      startPointerY: event.clientY,
      startLauncherY: currentPosition,
    };
    launcherPositionRef.current = currentPosition;
    suppressLauncherClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleLauncherPointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    const drag = launcherDragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientY - drag.startPointerY;

    if (Math.abs(distance) > 4) {
      suppressLauncherClickRef.current = true;
      setIsDraggingLauncher(true);
    }

    const nextPosition = clampLauncherPosition(
      drag.startLauncherY + distance,
      event.currentTarget.offsetHeight,
    );

    launcherPositionRef.current = nextPosition;
    setLauncherY(nextPosition);
  };

  const finishLauncherDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    const drag = launcherDragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (
      suppressLauncherClickRef.current &&
      launcherPositionRef.current !== null
    ) {
      window.localStorage.setItem(
        launcherPositionStorageKey,
        String(launcherPositionRef.current),
      );
    }

    launcherDragRef.current = null;
    setIsDraggingLauncher(false);
  };

  const handleLauncherKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      (event.key !== "ArrowUp" && event.key !== "ArrowDown") ||
      window.matchMedia("(max-width: 720px)").matches
    ) {
      return;
    }

    const launcher = event.currentTarget;
    const currentPosition =
      launcherPositionRef.current ??
      launcher.getBoundingClientRect().top + launcher.offsetHeight / 2;
    const direction = event.key === "ArrowUp" ? -1 : 1;
    const nextPosition = clampLauncherPosition(
      currentPosition + direction * 24,
      launcher.offsetHeight,
    );

    event.preventDefault();
    launcherPositionRef.current = nextPosition;
    setLauncherY(nextPosition);
    window.localStorage.setItem(launcherPositionStorageKey, String(nextPosition));
  };

  const closeAssistant = () => {
    setIsOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  };

  const resetConversation = () => {
    setMessages([]);
    setInput("");
    setError(null);
    setFailedRequest(null);
    window.setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const sendMessage = useCallback(
    async ({
      text,
      history,
      appendUserMessage,
    }: {
      text: string;
      history: ChatMessage[];
      appendUserMessage: boolean;
    }) => {
      const trimmedText = text.trim();

      if (!trimmedText || isSending) {
        return;
      }

      const requestHistory = history.slice(-16);

      setError(null);
      setFailedRequest(null);
      setIsSending(true);

      if (appendUserMessage) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: createMessageId(),
            role: "user",
            content: trimmedText,
          },
        ]);
      }

      try {
        const response = await fetch("/api/portfolio-assistant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedText,
            history: requestHistory.map(({ role, content }) => ({
              role,
              content,
            })),
            page: {
              pathname,
              homeView:
                pathname === "/" || pathname === "/work" ? homeView : undefined,
            },
          }),
        });

        const data = (await response.json()) as AssistantResponse;

        if (!response.ok || !data.reply) {
          throw new Error(data.error ?? "Assistant request failed.");
        }

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: createMessageId(),
            role: "assistant",
            content: data.reply ?? "",
          },
        ]);
      } catch {
        setError(
          "Something went sideways while answering. You can retry, or ask another portfolio question.",
        );
        setFailedRequest({
          message: trimmedText,
          history: requestHistory,
        });
      } finally {
        setIsSending(false);
      }
    },
    [homeView, isSending, pathname],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    setInput("");
    sendMessage({
      text: trimmedInput,
      history: messages,
      appendUserMessage: true,
    });
  };

  const handleStarterClick = (question: string) => {
    if (isSending) {
      return;
    }

    setInput("");
    sendMessage({
      text: question,
      history: messages,
      appendUserMessage: true,
    });
  };

  const handleRetry = () => {
    if (!failedRequest || isSending) {
      return;
    }

    sendMessage({
      text: failedRequest.message,
      history: failedRequest.history,
      appendUserMessage: false,
    });
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  const handleComposerInput = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 132)}px`;
  };

  return (
    <>
      <button
        aria-controls="portfolio-assistant-panel"
        aria-describedby="portfolio-assistant-launcher-instructions"
        aria-expanded={isOpen}
        aria-label="Open Lauren's Portfolio Assistant"
        className={`portfolio-assistant-launcher${
          isDraggingLauncher ? " is-dragging" : ""
        }`}
        onClick={openAssistant}
        onKeyDown={handleLauncherKeyDown}
        onPointerCancel={finishLauncherDrag}
        onPointerDown={handleLauncherPointerDown}
        onPointerMove={handleLauncherPointerMove}
        onPointerUp={finishLauncherDrag}
        ref={launcherRef}
        style={
          launcherY === null
            ? undefined
            : ({
                "--assistant-launcher-y": `${launcherY}px`,
              } as CSSProperties)
        }
        title="Drag up or down to move. Click to open."
        type="button"
      >
        <span className="portfolio-assistant-launcher__mark" aria-hidden="true">
          <Sparkles size={18} strokeWidth={1.9} />
        </span>
        <span className="portfolio-assistant-launcher__label">Lauren AI</span>
      </button>
      <span className="sr-only" id="portfolio-assistant-launcher-instructions">
        On larger screens, drag up or down to move this button. Use the up and
        down arrow keys when focused to reposition it.
      </span>

      {isOpen ? (
        <aside
          aria-describedby="portfolio-assistant-description"
          aria-labelledby="portfolio-assistant-title"
          aria-modal="false"
          className="portfolio-assistant-panel"
          id="portfolio-assistant-panel"
          role="dialog"
        >
          <div className="portfolio-assistant-panel__header">
            <div className="portfolio-assistant-panel__identity">
              <span
                className="portfolio-assistant-panel__mark"
                aria-hidden="true"
              >
                <Sparkles size={18} strokeWidth={1.9} />
              </span>
              <h2 id="portfolio-assistant-title">
                <span aria-hidden="true">Lauren AI</span>
                <span className="sr-only">Lauren's Portfolio Assistant</span>
              </h2>
              <button
                aria-expanded={showInfo}
                aria-label="About Lauren's Portfolio Assistant"
                className="portfolio-assistant-icon-button"
                onClick={() => setShowInfo((current) => !current)}
                type="button"
              >
                <Info size={17} strokeWidth={1.7} />
              </button>
            </div>

            <div className="portfolio-assistant-panel__actions">
              <button
                aria-label="Start a new assistant conversation"
                className="portfolio-assistant-icon-button"
                disabled={messages.length === 0 && !input}
                onClick={resetConversation}
                type="button"
              >
                <RotateCcw size={18} strokeWidth={1.7} />
              </button>
              <button
                aria-label="Close Lauren's Portfolio Assistant"
                className="portfolio-assistant-icon-button"
                onClick={closeAssistant}
                ref={closeButtonRef}
                type="button"
              >
                <X size={19} strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <p
            className="portfolio-assistant-panel__description sr-only"
            id="portfolio-assistant-description"
          >
            Ask professional questions about Lauren Johnson's portfolio,
            projects, experience, and design approach.
          </p>

          {showInfo ? (
            <p className="portfolio-assistant-panel__note">
              Grounded in Lauren&apos;s portfolio and approved professional
              context. It may not know every detail.
            </p>
          ) : null}

          <div
            aria-live="polite"
            className="portfolio-assistant-panel__body"
          >
            {messages.length === 0 ? (
              <div className="portfolio-assistant-empty">
                <p className="portfolio-assistant-empty__greeting">
                  Hey, ask away.
                </p>
                <div
                  aria-label={`Starter questions for ${pageContext.title}`}
                  className="portfolio-assistant-starters"
                >
                  {starterQuestions.map((question) => (
                    <button
                      className="portfolio-assistant-starter"
                      disabled={isSending}
                      key={question}
                      onClick={() => handleStarterClick(question)}
                      type="button"
                    >
                      <CornerDownRight size={15} strokeWidth={1.8} />
                      <span>{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="portfolio-assistant-messages">
                {messages.map((message) => (
                  <div
                    className={`portfolio-assistant-message portfolio-assistant-message--${message.role}`}
                    key={message.id}
                  >
                    <p>{renderMessageText(message.content)}</p>
                  </div>
                ))}
                {isSending ? (
                  <div className="portfolio-assistant-message portfolio-assistant-message--assistant portfolio-assistant-message--loading">
                    <span aria-label="Lauren's Portfolio Assistant is thinking">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                ) : null}
                {error ? (
                  <div className="portfolio-assistant-error" role="status">
                    <p>{error}</p>
                    <button
                      disabled={!failedRequest || isSending}
                      onClick={handleRetry}
                      type="button"
                    >
                      Retry
                    </button>
                  </div>
                ) : null}
                <div ref={latestMessageRef} />
              </div>
            )}
          </div>

          {messages.length > 0 ? (
            <div className="portfolio-assistant-context-actions">
              {starterQuestions.map((question) => (
                <button
                  disabled={isSending}
                  key={question}
                  onClick={() => handleStarterClick(question)}
                  type="button"
                >
                  {question}
                </button>
              ))}
            </div>
          ) : null}

          <form className="portfolio-assistant-composer" onSubmit={handleSubmit}>
            <textarea
              aria-label="Ask about Lauren"
              disabled={isSending}
              maxLength={maxInputLength}
              onChange={(event) => setInput(event.target.value)}
              onInput={handleComposerInput}
              onKeyDown={handleComposerKeyDown}
              placeholder="Ask about Lauren..."
              ref={textareaRef}
              rows={1}
              value={input}
            />
            <button
              aria-label="Send message"
              disabled={!input.trim() || isSending}
              type="submit"
            >
              <ArrowUp size={18} strokeWidth={1.8} />
            </button>
          </form>
        </aside>
      ) : null}
    </>
  );
}
