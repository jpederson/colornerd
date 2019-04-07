
# delete all the result files.
rm {book,csv,less,stylus,scss}/*

# build the project.
node build.js > stats.log

# output the log for development purposes
cat stats.log
