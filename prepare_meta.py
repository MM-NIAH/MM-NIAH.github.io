import os
import json

DATA_DIR = 'data'
TASK_LIST = [
    'retrieval-text-val',
    'retrieval-image-val',
    'counting-text-val',
    'counting-image-val',
    'reasoning-text-val',
    'reasoning-image-val',
    'overall-val',
    #
    'retrieval-text-test',
    'retrieval-image-test',
    'counting-text-test',
    'counting-image-test',
    'reasoning-text-test',
    'reasoning-image-test',
    'overall-test',
]
CONTEXT_RANGES = [
    "1K",
    "2K",
    "4K",
    "8K",
    "12K",
    "16K",
    "24K",
    "32K",
    "40K",
    "48K",
    "64K",
]
MODEL_INFO = {}
MODEL_SCORES = {task:{} for task in TASK_LIST}

def load_scores(path, model_name):
    if not os.path.exists(path):
        return

    with open(path) as file:
        res = json.load(file)
    res.pop('context_ranges')

    for k in res:
        if k == 'overall':
            continue
        MODEL_SCORES[k][model_name] = res[k]

    if 'overall' in res:
        val = 'val' in path
        k = f'{k}-val' if val else f'{k}-test'
        MODEL_SCORES[k][model_name] = res['overall']

    with open(os.path.join(DATA_DIR, model_name, 'meta.json')) as file:
        meta = json.load(file)

    MODEL_INFO[model_name] = {
        'source': meta['source'],
        'date': meta['date'],
    }

def load_leaderboard(task_name):
    leaderboard = []
    for model_name in MODEL_SCORES[task_name]:
        item = {}
        scores = MODEL_SCORES[task_name][model_name]

        for context_range, score in zip(CONTEXT_RANGES, scores):
            item[context_range] = score * 100
        item['Overall'] = sum(scores) / len(scores) * 100
        item['Model'] = model_name
        item['Source'] = MODEL_INFO[model_name]['source']
        item['Date'] = MODEL_INFO[model_name]['date']

        leaderboard.append(item)

    leaderboard_name = f'{task_name}-leaderboard'.replace('-', '_')
    leaderboard = sorted(leaderboard, reverse=True, key=lambda x:x['Overall'])

    item_human = None
    leaderboard_dict = {}
    for item in leaderboard:
        if item['Model'] == 'Human':
            item_human = item
            continue
        leaderboard_dict[len(leaderboard_dict)+1] = item
    leaderboard_dict['-'] = item_human

    save_path = os.path.join(DATA_DIR, f'{leaderboard_name}.js')
    with open(save_path, 'w') as file:
        file.write(f'{leaderboard_name} = {json.dumps(leaderboard_dict)}')

def main():
    for model_name in os.listdir(DATA_DIR):
        if not os.path.isdir(os.path.join(DATA_DIR, model_name)):
            continue

        val_path = os.path.join(DATA_DIR, model_name, 'scores_val.json')
        load_scores(val_path, model_name)

        test_path = os.path.join(DATA_DIR, model_name, 'scores_test.json')
        load_scores(test_path, model_name)

    for task in TASK_LIST:
        load_leaderboard(task)

if __name__ == '__main__':
    main()
