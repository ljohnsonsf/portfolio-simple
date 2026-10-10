import assert from "node:assert/strict";
import test from "node:test";
import { questionsForPath, robotQA } from "../lib/robot-qa.ts";

test("matches home, about, and normalized paths", () => {
  assert.equal(questionsForPath("/"), robotQA.home);
  assert.equal(questionsForPath("/work/"), robotQA.home);
  assert.equal(questionsForPath("/about/?ref=home"), robotQA.about);
});

test("each case study has its own questions with globally unique IDs", () => {
  const ids = new Set<string>();
  for (const [slug, questions] of Object.entries(robotQA.caseStudies)) {
    assert.equal(questionsForPath(`/work/${slug}`), questions);
    assert.notEqual(questions, robotQA.home);
  }
  for (const questions of [robotQA.home, robotQA.about, robotQA.aiPrototyping, robotQA.default, ...Object.values(robotQA.caseStudies)]) {
    assert.ok(questions.length > 0);
    for (const entry of questions) {
      assert.ok(!ids.has(entry.id), `Duplicate ID: ${entry.id}`);
      ids.add(entry.id);
      assert.ok(entry.question && entry.answer);
    }
  }
});

test("unknown routes and inherited object keys use the fallback", () => {
  for (const path of ["/resume", "/missing", "/about/team", "/work/missing", "/work/constructor", "/work/__proto__", "/work/aws-beginner-mode/more"]) {
    assert.equal(questionsForPath(path), robotQA.default);
  }
});


test("AI Prototypes tab uses its own copy without affecting other routes", () => {
  assert.equal(questionsForPath("/", "other-work"), robotQA.aiPrototyping);
  assert.equal(questionsForPath("/", "case-studies"), robotQA.home);
  assert.equal(questionsForPath("/about", "other-work"), robotQA.about);
  assert.equal(questionsForPath("/work/kara"), robotQA.caseStudies.kara);
});
