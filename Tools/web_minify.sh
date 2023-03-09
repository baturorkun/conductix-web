# Define the command to run
CMD="python3 web_minify.py $1"
cd web_minify
pip install -r requirements.txt


# Run the command
echo "Starting Web Minify Script for  $1"
$CMD