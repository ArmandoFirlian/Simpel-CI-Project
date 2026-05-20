terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

provider "docker" {}

resource "docker_image" "sudoku_image" {
  name = "sudoku-app:latest"

  build {
    context = "."
  }
}

resource "docker_container" "sudoku_container" {
  name  = "sudoku-container"
  image = docker_image.sudoku_image.image_id

  ports {
    internal = 3000
    external = 3000
  }
}
