"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { invitationForPath, questionsForPath, type RobotQuestion } from "@/lib/robot-qa";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { RobotCharacter } from "./robot-character";
import styles from "./robot-assistant.module.css";

type Message = { id: number; role: "visitor" | "robot"; text: string; link?: RobotQuestion["link"] };
export function RobotAssistant() {
  const pathname = usePathname();
  const [homeView, setHomeView] = useState("case-studies");
  useEffect(() => {
    const updateView = () => setHomeView(document.documentElement.dataset.workView === "other-work" ? "other-work" : "case-studies");
    updateView();
    window.addEventListener("lauren-portfolio-work-view-change", updateView);
    return () => window.removeEventListener("lauren-portfolio-work-view-change", updateView);
  }, [pathname]);
  const pageKey = pathname === "/" || pathname === "/work" ? `${pathname}:${homeView}` : pathname;
  // A new page starts a fresh invitation and conversation.
  return <RobotExperience key={pageKey} questions={questionsForPath(pathname, homeView)} invitation={invitationForPath(pathname, homeView)} />;
}

function RobotExperience({ questions, invitation }: {
  questions: RobotQuestion[];
  invitation: string;
}) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [idleWink, setIdleWink] = useState(false);
  const [laptopRest, setLaptopRest] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState<RobotQuestion | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const robotState = open ? (laptopRest ? "answering-rest" : "answering") : hovered || idleWink ? "hover" : "idle";

  useEffect(() => {
    setLaptopRest(false);
    if (!open || reducedMotion) return;
    let endRest: ReturnType<typeof setTimeout>;
    const interval = window.setInterval(() => {
      setLaptopRest(true);
      endRest = setTimeout(() => setLaptopRest(false), 1000);
    }, 5000);
    return () => { window.clearInterval(interval); clearTimeout(endRest); };
  }, [open, reducedMotion]);

  useEffect(() => {
    setIdleWink(false);
    if (open || hovered || reducedMotion) return;
    let endWink: ReturnType<typeof setTimeout>;
    const interval = window.setInterval(() => {
      setIdleWink(true);
      endWink = setTimeout(() => setIdleWink(false), 1000);
    }, 5000);
    return () => { window.clearInterval(interval); clearTimeout(endWink); };
  }, [open, hovered, reducedMotion]);

  function onOpen() {
    setOpen(true);
    setDismissed(true);
  }

  useEffect(() => {
    if (!pending) return;
    const timeout = window.setTimeout(() => {
      setMessages((previous) => [...previous, {
        id: nextId.current++, role: "robot", text: pending.answer, link: pending.link,
      }]);
      setPending(null);
    }, reducedMotion ? 0 : 1500);
    return () => window.clearTimeout(timeout);
  }, [pending, reducedMotion]);

  useEffect(() => {
    if (open) closeButton.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      launcher.current?.focus({ preventScroll: true });
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    const element = conversation.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, pending, open]);

  function close() {
    setOpen(false);
    setHovered(false);
    launcher.current?.focus({ preventScroll: true });
  }

  function ask(question: RobotQuestion) {
    if (pending) return;
    setMessages((previous) => [...previous, { id: nextId.current++, role: "visitor", text: question.question }]);
    setPending(question);
  }

  return (
    <aside className={styles.companion} aria-label="Lauren's portfolio guide">
      {open && (
        <section className={styles.panel} id="robot-qa-panel" role="dialog" aria-modal="false" aria-labelledby="robot-qa-title">
          <header className={styles.header}>
            <RobotCharacter state={robotState} small />
            <div className={styles.heading}>
              <h2 id="robot-qa-title">Ask about Lauren</h2>
              <p>A little guide to my work</p>
            </div>
            <button ref={closeButton} type="button" className={styles.iconButton} onClick={close} aria-label="Close questions">
              <X size={18} aria-hidden="true" />
            </button>
          </header>
          <div ref={conversation} className={styles.conversation} role="log" aria-label="Questions and answers" aria-live="polite" aria-relevant="additions text" tabIndex={0}>
            <p className={styles.welcome}>Hi there! Curious about something? Pick a question below and I&apos;ll help you out.</p>
            {messages.map((message) => (
              <div key={message.id} className={`${styles.message} ${message.role === "visitor" ? styles.visitorMessage : styles.answerMessage}`}>
                <span className={styles.srOnly}>{message.role === "visitor" ? "You: " : "Portfolio guide: "}</span>
                <p>
                  {message.role === "robot" ? (
                    <>
                      <span className={styles.srOnly}>{message.text}</span>
                      <span aria-hidden="true">
                        {(message.text.match(/\S+\s*/g) ?? []).map((word, index) => (
                          <span key={index} className={styles.answerWord} style={{ animationDelay: `${index * 24}ms` }}>{word}</span>
                        ))}
                      </span>
                    </>
                  ) : message.text}
                </p>
                {message.link && <Link href={message.link.href} className={styles.answerLink}>{message.link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>}
              </div>
            ))}
            {pending && <div className={styles.typing} aria-label="Preparing answer"><span /><span /><span /></div>}
          </div>
          <div className={styles.suggestions}>
            <div className={styles.questionList} aria-label="Suggested questions">
              {questions.map((question) => <button key={question.id} type="button" disabled={!!pending} onClick={() => ask(question)} className={styles.question}>{question.question}<span aria-hidden="true">↗</span></button>)}
            </div>
          </div>
        </section>
      )}
      {!open && !dismissed && (
        <div className={styles.invitation}>
          <button type="button" className={styles.invitationText} onClick={onOpen}>{invitation}</button>
          <button type="button" className={styles.dismissButton} aria-label="Dismiss invitation" onClick={() => { setDismissed(true); launcher.current?.focus({ preventScroll: true }); }}><X size={14} aria-hidden="true" /></button>
        </div>
      )}
      <button
        ref={launcher}
        type="button"
        className={styles.launcher}
        aria-label={open ? "Close questions about Lauren" : "Ask about Lauren"}
        aria-expanded={open}
        aria-controls={open ? "robot-qa-panel" : undefined}
        onClick={open ? close : onOpen}
        onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <span className={styles.sparkle} aria-hidden="true" />
        <span className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true" />
        <RobotCharacter state={robotState} />
      </button>
    </aside>
  );
}
