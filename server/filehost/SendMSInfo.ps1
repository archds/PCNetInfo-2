$Guid = New-Guid
$FileName = $Guid.toString() + '.nfo'
$FilePath = 'C:\Users\User\' + $FileName
msinfo32.exe /nfo $FilePath | Out-Null
Invoke-RestMethod -Uri 'http://localhost:8001/api/collect-msinfo/' -Method Post -InFile $FilePath -UseDefaultCredentials -AllowUnencryptedAuthentication