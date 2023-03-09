import os
import htmlmin
import csscompressor
import jsmin
import sys
import shutil

args = sys.argv


project = args[1]
if (project not in ["MPU", "IPS"]):
    print("Error: project code invalid")
    exit()

# Define the input and output directories
os.getcwd()

if (project == "MPU"):
    input_dir = os.getcwd() + "/../../MPU_FW/src/emNet/FS/html_not_minified/"
    output_dir = os.getcwd() + "/../../MPU_FW/src/emNet/FS/html/"
    excludedFiles = ["sse_mpu.js"]
if (project == "IPS"):
    input_dir = os.getcwd() + "/../../IPS_FW/WebServer/FS_RO/html_not_minified/"
    output_dir = os.getcwd() + "/../../IPS_FW/WebServer/FS_RO/html/"
    excludedFiles = ["Setting.htm"]

print(project + " minify started..")
print(input_dir)
print(output_dir)

if os.path.exists(output_dir):
    shutil.rmtree(output_dir)

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
total_size_diff = 0
total_input_size = 0
total_output_size = 0
# Minify all HTML, CSS, and JavaScript files in the input directory
for root, dirs, files in os.walk(input_dir):

    for filename in files:
        if (filename in excludedFiles):
            print(filename + " excluded")
            with open(input_path, 'rb') as f:
                file_content = f.read()
            with open(output_path, 'wb') as f:
                f.write(file_content)
            continue

        # Get the full path of the input file
        input_path = os.path.join(root, filename)

        # Determine the output path for the minified file
        output_path = os.path.join(output_dir, os.path.relpath(input_path, input_dir))

        # Create any necessary subdirectories in the output directory
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Minify HTML files
        if filename.endswith('.htm') or filename.endswith('.html'):
             with open(input_path, 'r') as f:
                 html_content = f.read()
             minified_content = htmlmin.minify(html_content, remove_empty_space=True, remove_all_empty_space=True)
             with open(output_path, 'w') as f:
                 f.write(minified_content)

        # Minify CSS files
        elif filename.endswith('.css'):
            with open(input_path, 'r') as f:
                css_content = f.read()
            minified_content = csscompressor.compress(css_content)
            with open(output_path, 'w') as f:
                f.write(minified_content)

        # Minify JavaScript files
        elif filename.endswith('.js'):
            with open(input_path, 'r') as f:
                js_content = f.read()
            minified_content = jsmin.jsmin(js_content)
            with open(output_path, 'w') as f:
                f.write(minified_content)

        # Copy other files (e.g., images) without modification
        else:
            with open(input_path, 'rb') as f:
                file_content = f.read()
            with open(output_path, 'wb') as f:
                f.write(file_content)
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        total_size_diff = total_size_diff + (input_size - output_size)
        total_input_size = total_input_size + input_size
        total_output_size = total_output_size + output_size
        # print("saving: " + str((input_size - output_size) / 1024) + " KB")

    print("Total Input Size: " + str(round((total_input_size / 1024), 2)) + " KB")
    print("Total Output Size: " + str(round((total_output_size / 1024), 2)) + " KB")
    print("Total  Saving: " + str(round(((total_input_size - total_output_size) / 1024), 2)) + " KB")
    print("Total  Saving % : " + str(round(((total_input_size - total_output_size) / total_input_size) * 100)) + " %")
