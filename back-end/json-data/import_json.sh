
for file in *.json; do
    collection_name=$(basename "$file" .json) 
    mongoimport --uri="mongodb://localhost:27017" --db sw-db --collection "$collection_name" --file "$file" --jsonArray
done


