# David Alvarez Gasca (`@Risoxas`) — Multi-Cloud Portfolio

A production-grade, **$0/month free-tier** developer portfolio showcasing a modern full-stack & multi-cloud serverless architecture across **Vercel**, **Google Cloud Run**, and **AWS Lambda**.

## Architecture (`$0/month` Free-Tier Split)

```
┌──────────────────────────────┐
│   Vercel (Hobby Free Tier)   │
│   apps/web — Next.js 15      │
│   React · TypeScript · SSR   │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────────┐  ┌──────────────────────────┐
│ GCP Cloud Run   │  │ AWS Lambda + API Gateway │
│ (Always Free)   │  │ (Free Tier)              │
│ Python FastAPI  │  │ Node.js / TypeScript     │
│ Scale-to-zero   │  │ Contact & Event Handler  │
└─────────────────┘  └──────────────────────────┘
```

| Layer | Provider | Service | Free-Tier Quota | Directory |
| --- | --- | --- | --- | --- |
| **Frontend & Edge** | Vercel | Hobby Plan (Next.js 15 App Router) | 100 GB bandwidth / mo | [`apps/web`](apps/web) |
| **Analytics API** | GCP | Cloud Run (Python 3.12 + FastAPI) | 2M req/mo · 360k vCPU-sec · Scale to 0 | [`services/gcp-analytics-api`](services/gcp-analytics-api) |
| **Contact Handler** | AWS | Lambda + HTTP API Gateway (Node 22) | 1M req/mo · 400k GB-sec | [`services/aws-contact-lambda`](services/aws-contact-lambda) |
| **IaC & CI/CD** | Multi | Terraform + GitHub Actions | Automated lint, typecheck, test, build | [`infra/terraform`](infra/terraform) |

> **Graceful Fallback:** `apps/web` runs 100% standalone on Vercel (or locally) using built-in Next.js Route Handlers (`/api/health`, `/api/contact`) until `GCP_API_URL` and `AWS_CONTACT_API_URL` environment variables are configured.

---

## Local Development

### 1. Frontend (`apps/web`)
```bash
cd apps/web
npm install
npm run dev
```
Open `http://localhost:3000`.

### 2. GCP FastAPI Service (`services/gcp-analytics-api`)
```bash
cd services/gcp-analytics-api
pip install -r requirements.txt
pytest -v
uvicorn app.main:app --reload --port 8080
```

### 3. AWS Lambda Handler (`services/aws-contact-lambda`)
```bash
cd services/aws-contact-lambda
npm install
npm test
npm run build
```

---

## Deploying on the Free Tier

### Step 1: Deploy Frontend to Vercel
1. Import `Risoxas/portfolio` in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `apps/web`.
3. Deploy! (Works immediately in standalone mode.)

### Step 2: (Optional) Provision GCP Cloud Run & AWS Lambda via Terraform
1. Build `services/aws-contact-lambda` (`npm run build`).
2. Build & push `services/gcp-analytics-api` Docker image to Artifact Registry.
3. Apply [`infra/terraform`](infra/terraform):
   ```bash
   cd infra/terraform
   terraform init
   terraform apply -var="gcp_project_id=YOUR_PROJECT" -var="gcp_container_image=YOUR_IMAGE_URI"
   ```
4. Copy the Terraform outputs (`aws_contact_api_url`, `gcp_analytics_api_url`) into Vercel Environment Variables as `AWS_CONTACT_API_URL` and `GCP_API_URL`, then redeploy.
