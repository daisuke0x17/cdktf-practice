import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { DockerProvider } from '@cdktf/provider-docker/lib/provider';
import { Image } from '@cdktf/provider-docker/lib/image';
import { Container } from '@cdktf/provider-docker/lib/container';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new DockerProvider(this, 'docker', {
      host: 'unix:///Users/<username>/.docker/run/docker.sock',
    });

    const dockerImage = new Image(this, 'nginxImage', {
      name: 'nginx:latest',
      keepLocally: false,
    });

    new Container(this, 'nginxContainer', {
      name: 'tutorial',
      image: dockerImage.name,
      ports: [
        {
          internal: 80,
          external: 8003,
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, 'learn-cdktf-docker');
app.synth();
