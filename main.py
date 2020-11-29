import pandas as pd
import requests
import json
from tqdm import tqdm

df = pd.read_pickle('./submissions.pkl')

contest_url = 'https://kenkoooo.com/atcoder/resources/contests.json'
data = requests.get(contest_url)
data = json.loads(data.text)
contest_limit = dict()

for contest in data:
    name = contest['id']
    start = int(contest['start_epoch_second'])
    end = start + int(contest['duration_second'])
    contest_limit[name] = end

data = requests.get(contest_url)
data = json.loads(data.text)

problem_url = 'https://kenkoooo.com/atcoder/resources/merged-problems.json'
data = requests.get(problem_url)
data = json.loads(data.text)
prob2contest = dict()

for prob in tqdm(data):
    name = prob['id']
    contest_name = prob['contest_id']
    prob2contest[name] = contest_name

    all_subs = df[df['problem_id'] == 'abc184_e']
    all_subs = all_subs[all_subs['result'] == 'AC']
    all_subs['epoch_second'].astype(int)
    if all_subs.empty:
        continue

    all_langs = set(all_subs['language'])
    all_langs_hist = dict()
    for lang in all_langs:
        all_langs_hist[lang] = len(all_subs[all_subs['language'] == lang])

    all_path = f'./json_data/{name}_all.json'
    with open(all_path, 'w') as f:
        json.dump(all_langs_hist, f)

    end_time = int(contest_limit[contest_name])
    contest_subs = all_subs[all_subs['epoch_second'] <= end_time]
    if contest_subs.empty:
        continue
    print(contest_subs)

    contest_langs = set(contest_subs['language'])
    contest_langs_hist = dict()
    for lang in contest_langs:
        contest_langs_hist[lang] = len(contest_subs[contest_subs['language'] == lang])

    contest_path = f'./json_data/{name}_contest.json'
    with open(contest_path, 'w') as f:
        json.dump(contest_langs_hist, f)
