import os, re, glob

issues = []
files = (glob.glob('src/**/*.ts', recursive=True)
         + glob.glob('src/**/*.tsx', recursive=True)
         + glob.glob('server/**/*.ts', recursive=True))
for f in files:
    d = os.path.dirname(f)
    for m in re.finditer(r"from ['\"](\.[^'\"]+)['\"]", open(f).read()):
        p = m.group(1)
        base = os.path.normpath(os.path.join(d, p))
        resolved = None
        for cand in (base, base + '.ts', base + '.tsx', base + '/index.ts', base + '.svg', base + '.css'):
            if os.path.isfile(cand):
                parts = cand.split('/')
                if all(e in os.listdir('/'.join(parts[:i])) for i, e in enumerate(parts[1:], 1)):
                    resolved = cand
                    break
        if not resolved:
            issues.append(f'{f}: {p}')
print('Files checked:', len(files))
print('Import resolution/casing issues:', len(issues))
print('\n'.join(issues))