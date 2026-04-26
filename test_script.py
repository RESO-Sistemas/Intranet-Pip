import os
import subprocess
import re

os.chdir('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip')
result = subprocess.run(['git', 'ls-files', '-m'], capture_output=True, text=True)
files = result.stdout.strip().split('\n')

pattern_precise = re.compile(r'(<div\s+class="preloader">[\s\S]*?<div\s+class="loader">[\s\S]*?<div\s+class="loader__figure"></div>[\s\S]*?<p\s+class="loader__label">PIP</p>[\s\S]*?</div>[\s\S]*?</div>)', re.IGNORECASE)

for f in files:
    if not f or not f.endswith('.php'): continue
    if not os.path.isfile(f): continue
    
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    
    if '<div class="preloader">' in content:
        if '<!-- <div class="preloader">' in content or '<!--\n<div class="preloader">' in content or '<!--\r\n<div class="preloader">' in content:
            print(f'Already commented: {f}')
            continue
            
        new_content = pattern_precise.sub(r'<!-- \1 -->', content)
        if new_content != content:
            print(f'Will update: {f}')
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
        else:
            print(f'Could not match full pattern in: {f}')

