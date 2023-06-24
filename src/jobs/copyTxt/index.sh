#!/bin/sh

cp ./origin/*.txt ./destiny

if [ $? -eq 0 ]; then
  echo "files copied successfully"
else
  echo "error copying files"
fi