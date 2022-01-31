#!/bin/bash
# content_directory ${1:-content}
subdirectories=("blog" "episode" "person" "series" "talk")

# Loop through each subfolder
for subfolder in ${subdirectories[@]}; do

  # Output the subfolder currently being looped through
  echo "Looping through ${subfolder}"

  # Find all files
  for f in $(find "./static/img/${subfolder}" -name '*'); do
    if [ -d "{$f}" ]; then
      echo "{$f} is a folder"
    else
      echo "{$f} is not a folder"
    fi
  done
done