FROM python
COPY . .
WORKDIR .
RUN pip install pipenv && pipenv install
CMD 'pipenv run main.py'
