# Uses a loop to import the data into the DB
for file in *.json; do # matches all files with .json in the current directory
    collection_name=$(basename "$file" .json) # extracts the base name of the file
    mongoimport --uri="mongodb://localhost:27017" --db sw-db --collection "$collection_name" --file "$file" --jsonArray
done


