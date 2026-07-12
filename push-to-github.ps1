# ─────────────────────────────────────────────────────────────
# 12Flock — Push to GitHub setup script
# Fill in YOUR details below, then run this file in PowerShell
# Right-click → "Run with PowerShell"  OR  paste into terminal
# ─────────────────────────────────────────────────────────────

# 1. SET THESE THREE VALUES:
$GITHUB_USERNAME = "YOUR-GITHUB-USERNAME"    # e.g. "johnmwangi"
$GITHUB_EMAIL    = "YOUR-GITHUB-EMAIL"       # e.g. "john@example.com"
$REPO_NAME       = "12-Flock-Lyrics-Distribution"  # your exact repo name on GitHub

# ─── Do not edit below this line ───────────────────────────────

$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

Set-Location $repoDir

Write-Host "`n[1/5] Configuring git identity..." -ForegroundColor Cyan
git config user.name  $GITHUB_USERNAME
git config user.email $GITHUB_EMAIL

Write-Host "[2/5] Renaming branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host "[3/5] Making initial commit..." -ForegroundColor Cyan
git commit -m "feat: full Vite+React app with enhanced UI and GitHub Actions deploy"

Write-Host "[4/5] Adding GitHub remote..." -ForegroundColor Cyan
$remoteUrl = "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git remote add origin $remoteUrl
Write-Host "      Remote: $remoteUrl" -ForegroundColor Gray

Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host "`n✓ Done! Now go to:" -ForegroundColor Green
Write-Host "  https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages" -ForegroundColor Yellow
Write-Host "  → Source: GitHub Actions  → Save" -ForegroundColor Yellow
Write-Host "`n  Your site will be live at:" -ForegroundColor Green
Write-Host "  https://$GITHUB_USERNAME.github.io/$REPO_NAME/" -ForegroundColor Cyan
Write-Host ""
