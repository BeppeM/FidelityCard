# Catalog Service

Port: 8086

## Rewards Operations:

- /api/catalog/reward/create
- /api/catalog/reward/get/{id}
- /api/catalog/reward/update/quantity/{id} (RequestBody not needed)
- /api/catalog/reward/redeemed/{id}
- /api/catalog/reward/update/description/{id} (RequestBody not needed)
- /api/catalog/reward/delete/{id}
- /api/catalog/reward/get/{manager}/{type}
- 

## Catalog Type Operations:

- /api/catalog/type/create
- /api/catalog/type/get/{manager}/{type}
- /api/catalog/type/delete/{manager}/{type}
- /api/catalog/type/update "update description" (RequestBody needed)
- /api/catalog/type/get/all/{manager}