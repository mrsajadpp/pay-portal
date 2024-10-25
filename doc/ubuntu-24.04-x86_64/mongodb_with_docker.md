## Installing MongoDB with Docker

To install and run MongoDB using Docker, follow these steps:

### Prerequisites

- Ensure Docker is installed on your system. If Docker is not installed, you can follow the [official Docker installation guide](https://docs.docker.com/engine/install/) for your operating system.

### Step-by-Step Installation

1. **Install Docker** (if not already installed):

   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io
   ```

2. **Start Docker Service**:

   ```bash
   sudo systemctl start docker
   ```

3. **Pull and Run MongoDB Container**:

   To pull the MongoDB image and run it as a container, use the following command:

   ```bash
   sudo docker run -d -p 27017:27017 --name mongodb mongo:4.4
   ```

   - `-d` runs the container in detached mode.
   - `-p 27017:27017` maps the MongoDB port 27017 on your host to port 27017 in the container.
   - `--name mongodb` names the container `mongodb`.
   - `mongo:4.4` specifies the MongoDB image and version to use.

4. **Verify MongoDB Container Status**:

   Check if the MongoDB container is running:

   ```bash
   sudo docker ps
   ```

   You should see the `mongodb` container listed with its status.

5. **Check Container Logs**:

   To view the logs of the MongoDB container:

   ```bash
   sudo docker logs mongodb
   ```

6. **Access MongoDB from Inside the Container**:

   To connect to MongoDB from within the container:

   ```bash
   sudo docker exec -it mongodb mongo
   ```

   This will open the MongoDB shell where you can interact with your MongoDB instance.

### Additional Notes

- **Stopping the MongoDB Container**:

  To stop the MongoDB container:

  ```bash
  sudo docker stop mongodb
  ```

- **Removing the MongoDB Container**:

  To remove the MongoDB container:

  ```bash
  sudo docker rm mongodb
  ```

- **Restarting Docker**:

  If you encounter issues with Docker or need to apply updates, you may need to restart Docker:

  ```bash
  sudo systemctl restart docker
  ```
