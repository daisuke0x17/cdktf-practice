## メモ
### CDKTFとは
- Cloud Development Kit for Terraform (CDKTF)は、C#、Python、TypeScript、Java、GoのコードからJSONのTerraform設定を生成
    - JSONを使ってTerraformを実行しインフラ構築

![](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fterraform%252Fcdktf%252Fterraform-as-platform.png%26width%3D1776%26height%3D1317&w=1920&q=75)

### ハンズオン
#### 前提
- Terraform のインストール
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

#### CDKTFのインストール
```bash
npm install --global cdktf-cli@latest
```

#### プロジェクトの作成
- `--local`をつけるとTerraform Cloudは使わずローカル（Docker）で実行することになる
```bash
cdktf init --template=typescript --providers=kreuzwerker/docker --local
```

> **Note** <!-- Note / Warning -->
> チュートリアル通りだとDocker daemonに接続できないというエラーが出る
> ```bash
> Error: Error pinging Docker server: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
> ```
> 以下に修正することで解決
> ```typescript
> new DockerProvider(this, 'docker', {
>   host: 'unix:///Users/<username>/.docker/run/docker.sock',
> });



#### デプロイ
```bash
cdktf deploy
```

#### 破棄
```bash
cdktf destroy
```

## 資料
- https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install?variants=cdk-language%3Atypescript