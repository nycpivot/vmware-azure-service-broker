cf target -s azure-service-broker
pause
@cls

cf unbind-service vmware-azure-service-broker-cosmosdb-node asb-cosmosdb
pause
@cls

cf delete-service asb-cosmosdb -f
pause
@cls

cf delete vmware-azure-service-broker-cosmosdb-node -r -f
pause
@cls