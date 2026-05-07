import psycopg2

try:
    # Docker'daki veritabanına bağlanıyoruz
    connection = psycopg2.connect(
        host="localhost",
        database="flameeye_db",
        user="postgres",
        password="emalfyee",
        port="5432"
    )

    cursor = connection.cursor()

    # Veritabanındaki verileri çekiyoruz
    cursor.execute("SELECT * FROM detections;")
    rows = cursor.fetchall()

    print("\n--- FlameEye Veritabanı Kayıtları ---")
    if not rows:
        print("Veritabanı bağlantısı kuruldu ama içinde veri yok.")
    for row in rows:
        print(f"ID: {row[0]} | Konum: {row[1]}, {row[2]} | Güven Skoru: {row[3]}")
    print("--------------------------------------\n")

except Exception as error:
    print(f"Bağlantı hatası: {error}")

finally:
    if 'connection' in locals() and connection:
        cursor.close()
        connection.close()
        print("Bağlantı güvenli bir şekilde kapatıldı.")