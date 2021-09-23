$ip = $args[0]
$port = $args[1]
$Uri = "http://${ip}:${port}/api/collect-msinfo/"
$Guid = New-Guid
$FileName = $Guid.toString() + '.nfo'
$FilePath = "C:\Users\User\${FileName}"
msinfo32.exe /nfo $FilePath | Out-Null
Invoke-RestMethod -Uri $Uri -Method Post -InFile $FilePath -UseDefaultCredentials -AllowUnencryptedAuthentication