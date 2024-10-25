# MongoDB Installation Guide for Ubuntu 24.04

## Overview

This guide provides step-by-step instructions for installing MongoDB on Ubuntu 24.04 (x86_64) systems with AMD CPUs. It covers installation for MongoDB 7.0 and MongoDB 4.4, addressing potential compatibility issues.

## Prerequisites

- Ubuntu 24.04 (x86_64) system with sudo privileges.
- Internet connection.

## 1. Installing MongoDB 7.0

MongoDB 7.0 requires modern CPU features (SSE4.2 and AVX). If your CPU does not support these features, follow the instructions for MongoDB 4.4 instead.

### 1.1 Add the MongoDB GPG Key

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb-server-7.asc
```

### 1.2 Create a MongoDB Repository File

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

### 1.3 Update the Package Database

```bash
sudo apt-get update
```

### 1.4 Install MongoDB

```bash
sudo apt-get install -y mongodb-org
```

### 1.5 Start and Enable MongoDB

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 1.6 Verify Installation

Check the status of the MongoDB service:

```bash
sudo systemctl status mongod
```

Connect to MongoDB shell:

```bash
mongo
```

## 2. Installing MongoDB 4.4

If MongoDB 7.0 fails due to CPU compatibility issues (SSE4.2 or AVX not supported), install MongoDB 4.4 instead.

### 2.1 Add the MongoDB Public Key for 4.4

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb-org-4.4.asc
```

### 2.2 Create a MongoDB Repository File for 4.4

```bash
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

### 2.3 Update the Package Database

```bash
sudo apt-get update
```

### 2.4 Install MongoDB 4.4

```bash
sudo apt-get install -y mongodb-org
```

### 2.5 Start and Enable MongoDB

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2.6 Verify Installation

Check the status of the MongoDB service:

```bash
sudo systemctl status mongod
```

Connect to MongoDB shell:

```bash
mongo
```

## Additional Notes

- **GPG Key Errors**: If you encounter GPG key errors, ensure that the correct GPG key is added for the MongoDB version you are installing.
- **Compatibility Issues**: For CPUs that do not support required instruction sets, MongoDB 4.4 is a suitable alternative.
- **MongoDB Logs**: Logs can be found at `/var/log/mongodb/mongod.log`. Check these logs if you encounter any issues.

## Conclusion

You should now have MongoDB installed and running on your Ubuntu 24.04 system. You can proceed with using MongoDB for your applications.

For more detailed information, refer to the [MongoDB documentation](https://docs.mongodb.com/manual/).
