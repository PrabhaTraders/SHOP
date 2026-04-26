Add-Type -AssemblyName System.Windows.Forms
$dlg = New-Object System.Windows.Forms.OpenFileDialog
$dlg.Filter = "Images (*.png, *.jpg, *.jpeg)|*.png;*.jpg;*.jpeg"
$dlg.Title = "Select Your Prabha Traders Logo (Just one more time!)"
if ($dlg.ShowDialog() -eq 'OK') {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $dest = Join-Path $scriptDir "images\logo.png"
    Copy-Item $dlg.FileName $dest -Force
    # Automatically open the browser to show the user it worked!
    Start-Process (Join-Path $scriptDir "index.html")
    Write-Host "Logo successfully saved!"
} else {
    Write-Host "Action Cancelled."
}
