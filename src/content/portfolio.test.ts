import assert from "node:assert/strict";
import { getPortfolioContent, portfolio } from "./portfolio.ts";

assert.equal(portfolio.ru.projects.length, portfolio.en.projects.length);
assert.equal(portfolio.ru.skills.length, portfolio.en.skills.length);
assert.equal(portfolio.ru.architectureSteps.length, portfolio.en.architectureSteps.length);
assert.equal(portfolio.ru.projects[1].source, "");
assert.equal(portfolio.en.projects[1].source, "");
assert.equal(getPortfolioContent("en").contactButton, "Email me on baibakovkir@yandex.ru");
assert.equal(getPortfolioContent("ru").contactButton, "Почта - baibakovkir@yandex.ru");
