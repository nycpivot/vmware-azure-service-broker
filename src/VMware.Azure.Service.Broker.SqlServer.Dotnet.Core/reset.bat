cf target -s azure-service-broker
pause
@cls

cf unbind-service vmware-azure-service-broker-sqlserver-dotnet-core asb-sqldb
pause
@cls

cf delete-service asb-sqldb -f
pause
@cls

cf delete vmware-azure-service-broker-sqlserver-dotnet-core -r -f
pause
@cls