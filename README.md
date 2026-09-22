# Mango — protótipo

Etapa atual: câmera → compressão/EXIF (canvas) → salvar no navegador (IndexedDB) → galeria.
Sem Supabase, sem R2, sem contas, sem backend — tudo roda no próprio dispositivo.

```bash
npm run dev
```

Abre em `https://localhost:5173` (HTTPS autoassinado, necessário para a câmera).
As fotos ficam salvas no IndexedDB do navegador — cada dispositivo tem seu
próprio "rolo".

## Deploy

Todo push em `main` publica automaticamente em
**https://lhduarten.github.io/mango/** via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).
