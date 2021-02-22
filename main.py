import flask
import pandas as pd


app = flask.Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Index page view handler.
    :return: rendered index.html template
    """
    return flask.render_template('index.html')

@app.route('/data', methods=['GET', 'POST'])
def data():
    """
    Data view handler
    :return: JSON object of the data CSV file
    """
    data = pd.read_csv('task_data.csv')

    context = {
        'sensor_data': data.to_dict(orient='list')
    }
    return flask.jsonify(context)
