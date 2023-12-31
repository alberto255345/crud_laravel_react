FROM php:8.2-fpm

RUN apt clean && rm -rf /var/lib/apt/lists/*
RUN apt update -y 
RUN apt upgrade -y
ENV ACCEPT_EULA=Y

ARG user=${user:-"app"}
ARG uid=${uid:-"1000"}

# Adding Tz information
ENV TZ=America/Sao_Paulo

# Installing necessary initial packages
RUN apt-get install software-properties-common -y

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    zip \
    nano \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libmcrypt-dev \
    libpq-dev \
    postgresql \
    iputils-ping \
    nmap \
    tcpdump

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

WORKDIR /var/www

# Install Composer globally (version 2.5.8)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=2.5.8

USER $user

# Execute o script
CMD ["./start.sh"]