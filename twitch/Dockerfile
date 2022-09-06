FROM ubuntu:18.04

RUN apt-get update && apt install --yes apt-utils
RUN apt-get install -y curl \
sudo 
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
RUN apt-get install -y fish \
vim \
python3 \
gcc \
g++ \
git \
make \
unzip \
zip \
wget \
nodejs 
RUN pip install Django -y
