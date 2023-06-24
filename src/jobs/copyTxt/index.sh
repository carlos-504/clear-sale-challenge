
cp "./origin"/*.txt "./destiny"

if [ $? -eq 0 ]; then
  echo "Cópia dos arquivos .txt concluída com sucesso."
else
  echo "Ocorreu um erro ao copiar os arquivos."
fi