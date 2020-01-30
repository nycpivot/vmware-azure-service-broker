cf target -s azure-service-broker
pause
@cls

cf create-service azure-sqldb basic asb-sqldb -c asb-sqldb.json
pause