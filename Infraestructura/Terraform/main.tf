provider "aws" {
    region = "us-east-2"
}

data "aws_ami" "ubuntu" {
    most_recent = true
    owners      = ["amazon"]
    filter {
        name   = "name"
        values = ["amzn2-ami-hvm*"]
    }
}

resource "aws_security_group" "c7-grupo-05" {
    name        = "c7-grupo-05"
    description = "c7-grupo-05"
    vpc_id      = vpc-048e6b0ade15fd885
    ingress {
        description = "SSH from the internet"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        description = "API from the internet"
        from_port   = 8080
        to_port     = 8080
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "c7-grupo-05"
    }
}

resource "aws_instance" "backend-c7-grupo-05" {
    ami                         = data.aws_ami.ubuntu.id
    associate_public_ip_address = true
    instance_type               = "t2.micro"
    key_name                    = "backend-c7-grupo-05"
    subnet_id                   = subnet-029c0d66578fdae85
    vpc_security_group_ids      = aws_security_group.c7-grupo-05.id
}

resource "aws_s3_bucket" "frontend-c7-grupo-05" {
  bucket = "frontend-c7-grupo-05"
}

resource "aws_s3_bucket_acl" "frontend-c7-grupo-05" {
  bucket = aws_s3_bucket.frontend-c7-grupo-05.id

  acl = "public-read"
}

resource "aws_s3_bucket_website_configuration" "frontend-c7-grupo-05" {
  bucket = aws_s3_bucket.frontend-c7-grupo-05.bucket

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.frontend-c7-grupo-05.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          aws_s3_bucket.wesped-terraform.arn,
          "${aws_s3_bucket.wesped-terraform.arn}/*",
        ]
      },
    ]
  })
}