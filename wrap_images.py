import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_img(match):
    whitespace = match.group(1)
    src = match.group(2)
    suffix = match.group(3)
    
    # We construct the <a> tag wrapping the <img> tag.
    # Keep the original whitespace for the <a> tag.
    # We will indent the <img> tag a bit more.
    img_indent = whitespace + "    "
    
    return f'{whitespace}<a href="{src}" class="gallery-item">\n{img_indent}<img src="{src}"{suffix}\n{whitespace}</a>'

# Find all imgs in the featured_sessions directories.
pattern = r'^([ \t]*)<img src="(assets/featured_sessions/[^\"]+)"([^>]+>)'
new_content, count = re.subn(pattern, replace_img, content, flags=re.MULTILINE)
print(f"Replaced {count} instances.")

if count > 0:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
