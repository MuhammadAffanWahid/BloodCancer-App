import os

def process_images(case_number):
    folder_path = f"images/{case_number}"
    
    image_paths = []
    
    if os.path.exists(folder_path):
        for file_name in os.listdir(folder_path):
            if file_name.startswith("image_"):
                full_path = os.path.join(folder_path, file_name)
                image_paths.append(full_path)

    run_model(image_paths)
    return


# Takes in images paths
# Save the predictions as predictions.csv under images/{case_number} folder
def run_model(image_paths):
    pass