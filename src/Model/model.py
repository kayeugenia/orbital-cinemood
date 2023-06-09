from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import torch
from sklearn.preprocessing import normalize
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('all-mpnet-base-v2')
model.max_seq_length = 384

tensors = torch.load('./Overall Movies.pt')

dataset = pd.read_csv('./Overall Movie.csv')

@app.route("/find_similarity/", methods=['POST', 'OPTIONS'])
@cross_origin(options=None)

def find_similarity():
    item = request.get_json()
    input = item['input'].lower()
    input = input.replace("[^a-zA-Z#]", " ")
    embeddings1 = model.encode(input, convert_to_tensor=True)
    cosine_scores = util.pytorch_cos_sim(embeddings1, tensors)
    top_results = torch.topk(cosine_scores, k=30)
    top_indices = top_results[1][0]
    top_scores = top_results[0][0]

    results = []
    for i in range(30):
        results.append({
            'movie': dataset['Movie Name'][top_indices[i].item()],
            'score': float(top_scores[i].item()),
            'year': dataset['Year of Release'][top_indices[i].item()],
            'rating': dataset['Movie Rating'][top_indices[i].item()]
        })

    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(port=8000)

