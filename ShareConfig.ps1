$Body = Get-ComputerInfo | select -Property WindowsProductName, WindowsVersion, CsCaption, CsDomain, CsNetworkAdapters, CsProcessors, CsPhyicallyInstalledMemory, CsUserName, OsArchitecture, TimeZone
$hardwaretype = Get-WmiObject -Class Win32_ComputerSystem -Property PCSystemType
If ($hardwaretype -ne 2)
{
    $hardwaretype = "desktop"
}
Else
{
    $hardwaretype = "laptop"
}

$Monitors = Get-WmiObject -Namespace "root\WMI" -Class "WMIMonitorID" -ErrorAction SilentlyContinue
$Monitor_Array = @()

ForEach ($Monitor in $Monitors)
{
    If ([System.Text.Encoding]::ASCII.GetString($Monitor.UserFriendlyName) -ne $null)
    {
        $Mon_Model = ([System.Text.Encoding]::ASCII.GetString($Monitor.UserFriendlyName)).Replace("$( [char]0x0000 )", "")
    }
    else
    {
        $Mon_Model = $null
    }
    $Mon_Serial_Number = ([System.Text.Encoding]::ASCII.GetString($Monitor.SerialNumberID)).Replace("$( [char]0x0000 )", "")
    $Mon_Attached_Computer = ($Monitor.PSComputerName).Replace("$( [char]0x0000 )", "")
    $Mon_Manufacturer = ([System.Text.Encoding]::ASCII.GetString($Monitor.ManufacturerName)).Replace("$( [char]0x0000 )", "")

    If ($Mon_Model -like "*800 AIO*" -or $Mon_Model -like "*8300 AiO*")
    {
        Break
    }

    $Mon_Manufacturer_Friendly = $ManufacturerHash.$Mon_Manufacturer
    If ($Mon_Manufacturer_Friendly -eq $null)
    {
        $Mon_Manufacturer_Friendly = $Mon_Manufacturer
    }
    $Monitor_Obj = [PSCustomObject]@{
        Model = $Mon_Model
        SerialNumber = $Mon_Serial_Number
    }
    $Monitor_Array += $Monitor_Obj
}

$Motherboard = Get-WmiObject -Class Win32_BaseBoard | select Manufacturer, Product, SerialNumber
$Videocard = Get-WmiObject Win32_VideoController  | select Caption, CurrentHorizontalResolution, CurrentVerticalResolution
$Memory = Get-WmiObject win32_physicalmemory | select Configuredclockspeed, Capacity

$Body | Add-Member -NotePropertyName Hardwaretype -NotePropertyValue $hardwaretype
$Body | Add-Member -NotePropertyName Monitors -NotePropertyValue $Monitor_Array
$Body | Add-Member -NotePropertyName Motherboard -NotePropertyValue $Motherboard
$Body | Add-Member -NotePropertyName Videocard -NotePropertyValue $Videocard
$Body | Add-Member -NotePropertyName Memory -NotePropertyValue $Memory
$ip = $args[0]
$port = $args[1]
$Uri = "http://${ip}:${port}/pc"
$JsonBody = $Body | ConvertTo-Json
Invoke-RestMethod -ContentType "application/json" -Uri $Uri -Method Post -Body $JsonBody