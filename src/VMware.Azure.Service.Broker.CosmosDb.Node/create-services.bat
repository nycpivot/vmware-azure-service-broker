cf target -s azure-service-broker
pause
@cls

cf create-service azure-cosmosdb standard asb-cosmosdb -c asb-cosmosdb.json
pause