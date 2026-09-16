"""Traveler harness validator.

13 checks over CLAUDE.md, .claude/skills, .claude/commands, and the
Screen Route Contract. VALIDATE_HARNESS_PASS on success; otherwise prints
missing files/rules and exits 1.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COMMANDS_DIR = ROOT / ".claude" / "commands"
SKILLS_DIR = ROOT / ".claude" / "skills"
CLAUDE_MD = ROOT / "CLAUDE.md"
DESIGN_PATH = ROOT / "design-reference" / "D-001" / "DESIGN.md"
SCREEN_CONTRACT_PATH = ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"

EXPECTED_COMMAND_COUNT = 7

RULE_TEXT_CHECKS = [
    ("Page Owner 5개 규칙", ["Page Owner", "5개"]),
    ("DB Table 6개 기본 범위 규칙", ["6개", "테이블"]),
    ("외부 입력 비저장 규칙", ["국가/지역/날짜", "서버·DB·URL 쿼리·로그"]),
    ("Playwright Chromium Smoke 규칙", ["Playwright", "Chromium"]),
    ("EXCLUDED 보호 규칙", ["EXCLUDED"]),
]


def fail(errors):
    for e in errors:
        print(f"FAIL: {e}")
    sys.exit(1)


def main():
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")

    errors = []
    checks_passed = 0

    # 1. CLAUDE.md 존재
    if CLAUDE_MD.is_file():
        checks_passed += 1
    else:
        errors.append("CLAUDE.md 없음")

    # 2. Claude Code Skill 파일 존재
    skill_files = list(SKILLS_DIR.glob("**/SKILL.md")) if SKILLS_DIR.is_dir() else []
    if skill_files:
        checks_passed += 1
    else:
        errors.append(f"{SKILLS_DIR} 안에 SKILL.md 없음")

    # 3. 7개 Command 존재
    command_files = sorted(COMMANDS_DIR.glob("*.md")) if COMMANDS_DIR.is_dir() else []
    if len(command_files) == EXPECTED_COMMAND_COUNT:
        checks_passed += 1
    else:
        names = ", ".join(f.name for f in command_files) or "(없음)"
        errors.append(
            f".claude/commands 파일 수 {len(command_files)}개 (요구: {EXPECTED_COMMAND_COUNT}개) — 현재: {names}"
        )

    claude_text = CLAUDE_MD.read_text(encoding="utf-8") if CLAUDE_MD.is_file() else ""
    skill_text = skill_files[0].read_text(encoding="utf-8") if skill_files else ""
    combined_text = claude_text + "\n" + skill_text

    # 4. traveler-screen-route-v1 Marker 존재
    if "traveler-screen-route-v1" in claude_text:
        checks_passed += 1
    else:
        errors.append("CLAUDE.md에 traveler-screen-route-v1 Marker 없음")

    # 5. D-001 DESIGN 경로 일치
    if "DESIGN_PATH=design-reference/D-001/DESIGN.md" in claude_text and DESIGN_PATH.is_file():
        checks_passed += 1
    else:
        errors.append("DESIGN_PATH Marker 불일치 또는 design-reference/D-001/DESIGN.md 없음")

    # 6. Screen Contract 경로 일치
    if "SCREEN_CONTRACT=design-reference/SCREEN_ROUTE_CONTRACT.json" in claude_text and SCREEN_CONTRACT_PATH.is_file():
        checks_passed += 1
    else:
        errors.append("SCREEN_CONTRACT Marker 불일치 또는 design-reference/SCREEN_ROUTE_CONTRACT.json 없음")

    # 7-10, 13: rule text checks
    for label, keywords in RULE_TEXT_CHECKS:
        if all(kw in combined_text for kw in keywords):
            checks_passed += 1
        else:
            missing_kw = [kw for kw in keywords if kw not in combined_text]
            errors.append(f"{label} 없음 (CLAUDE.md/SKILL.md에서 누락된 문구: {missing_kw})")

    # 11. AUTO_MERGE=false
    if "AUTO_MERGE=false" in claude_text:
        checks_passed += 1
    else:
        errors.append("CLAUDE.md에 AUTO_MERGE=false 없음")

    # 12. AWS_ENABLED=false
    if "AWS_ENABLED=false" in claude_text:
        checks_passed += 1
    else:
        errors.append("CLAUDE.md에 AWS_ENABLED=false 없음")

    if errors:
        fail(errors)

    print(f"VALIDATE_HARNESS_PASS ({checks_passed} checks)")
    sys.exit(0)


if __name__ == "__main__":
    main()
