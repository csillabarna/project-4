
from app import app, db

from models.site import Site
from models.user import User
from models.comment import Comment
from models.favourites import Favourites

with app.app_context():

    db.drop_all()

    db.create_all()

    balta = User(
        username="balta",
        email="balta@balta.com",
        password="pass"
    )

    csilla = User(
        username="csilla",
        email="csilla@csilla.com",
        password="pass"
    )

    balta.save()
    csilla.save()
    print('User created')

    alhambra = Site(
        region="Europe and North America",
        name="Alhambra, Generalife and Albayzín, Granada",
        latitude=37.17667,
        longitude=-3.59444,
        country="Spain",
        province="Province of Granada, Autonomous Community of Andalusia",
        description="Rising above the modern lower town, the Alhambra and the Albaycín, situated on two adjacent hills, form the medieval part of Granada. To the east of the Alhambra fortress and residence are the magnificent gardens of the Generalife, the former rural residence of the emirs who ruled this part of Spain in the 13th and 14th centuries. The residential district of the Albaycín is a rich repository of Moorish vernacular architecture, into which the traditional Andalusian architecture blends harmoniously.",
        thumbnail_id='9cf243e9fa6b0b572f0a4028e7a8fba7',
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Alhambradesdegeneralife.jpg/1024px-Alhambradesdegeneralife.jpg',
        weblink='https://whc.unesco.org/en/list/314',
        date_inscribed=1984,
        user=balta

    )
    palau = Site(

        region="Europe and North America",
        name="Palau de la Música Catalana and Hospital de Sant Pau, Barcelona",
        latitude=41.38778,
        longitude=2.175,
        country="Spain",
        province="Province of Barcelona, Autonomous Community of Catalonia",
        description="These are two of the finest contributions to Barcelona's architecture by the Catalan art nouveau architect Lluís Domènech i Montaner. The Palau de la Música Catalana is an exuberant steel-framed structure full of light and space, and decorated by many of the leading designers of the day. The Hospital de Sant Pau is equally bold in its design and decoration, while at the same time perfectly adapted to the needs of the sick.",
        thumbnail_id='9cf243e9fa6b0b572f0a4028e7a8fba7',
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Alhambradesdegeneralife.jpg/1024px-Alhambradesdegeneralife.jpg',
        weblink="https://whc.unesco.org/en/list/804",
        date_inscribed=1997,
        user=csilla

    )

    print('Sites created')

    comment = Comment(
        content='I love this place ',
        # rating=5,
        user=balta,
        site=alhambra
    )
    print('Comment created')

    favourite = Favourites(
        user=balta,
        site=alhambra
    )
    print('Favourites created')

    print('Adding to database:')

    db.session.add(alhambra)
    db.session.add(palau)
    db.session.add(comment)

    db.session.commit()
    print('Completed!')
