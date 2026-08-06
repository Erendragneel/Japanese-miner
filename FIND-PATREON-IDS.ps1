$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

Write-Host ''
Write-Host 'Language Miner Patreon ID Finder' -ForegroundColor Cyan
Write-Host 'This reads your campaign and tier IDs without saving or displaying your access token.'
Write-Host ''

$secureToken = Read-Host 'Paste your Patreon Creator Access Token (the text stays hidden)' -AsSecureString
$tokenPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)

try {
  $creatorToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($tokenPointer)
  if ([string]::IsNullOrWhiteSpace($creatorToken)) { throw 'No access token was entered.' }

  $headers = @{
    Authorization = "Bearer $creatorToken"
    Accept = 'application/json'
    'User-Agent' = 'Language Miner - Setup Helper'
  }
  $requestUrl = 'https://www.patreon.com/api/oauth2/v2/campaigns?include=tiers&fields%5Bcampaign%5D=creation_name&fields%5Btier%5D=title,amount_cents,published'
  $response = Invoke-RestMethod -Method Get -Uri $requestUrl -Headers $headers
  $campaigns = @($response.data)
  $included = @($response.included)

  if (-not $campaigns.Count) { throw 'Patreon did not return a creator campaign. Make sure you used the Creator Access Token from your own creator account.' }

  foreach ($campaign in $campaigns) {
    Write-Host ''
    Write-Host "Campaign: $($campaign.attributes.creation_name)" -ForegroundColor Green
    Write-Host "PATREON_CAMPAIGN_ID=$($campaign.id)"
    Write-Host 'Tiers:'
    $tierIds = @($campaign.relationships.tiers.data | ForEach-Object { [string]$_.id })
    foreach ($tierId in $tierIds) {
      $tier = $included | Where-Object { $_.type -eq 'tier' -and [string]$_.id -eq $tierId } | Select-Object -First 1
      $title = if ($tier.attributes.title) { [string]$tier.attributes.title } else { 'Unnamed tier' }
      $price = if ($null -ne $tier.attributes.amount_cents) { [math]::Round([double]$tier.attributes.amount_cents / 100, 2) } else { '?' }
      Write-Host "  $title (`$$price): $tierId"
    }
  }

  Write-Host ''
  Write-Host 'Copy the campaign ID and the three matching tier IDs into Supabase Edge Function Secrets.' -ForegroundColor Yellow
  Write-Host 'Do not copy your Creator Access Token into GitHub or patreon-config.js.' -ForegroundColor Yellow
}
catch {
  Write-Host ''
  Write-Host "Could not read Patreon IDs: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
finally {
  $creatorToken = $null
  if ($tokenPointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($tokenPointer) }
}
