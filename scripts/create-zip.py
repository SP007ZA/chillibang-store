import os
import zipfile

exclude_dirs = {'.git', 'node_modules', '.next', 'dist', '__pycache__', '.cache'}
exclude_files = {'chillibang-store.zip'}

os.makedirs('public', exist_ok=True)
zip_path = os.path.join('public', 'chillibang-store.zip')

if os.path.exists(zip_path):
    os.remove(zip_path)

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
        for file in files:
            if file in exclude_files or file.endswith('.zip') or file.endswith('.pyc'):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, '.')
            zipf.write(full_path, rel_path)

print(f"Zip created successfully at {zip_path}: {os.path.getsize(zip_path)} bytes")
