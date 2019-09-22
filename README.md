# NFQProject
NFQ Front-end project.

1 Lygis:

Yra JSON failas su pavyzdiniu klientu sąrašu +
Yra mygtukas išsaugoti pavyzdinius duomenis į localStorage (ar IndexDB) (administravimo puslapis) +
Pavyzdiniai duomenys įkraunami dinamiškai neperkraunant naršyklės (AJAX užklausa) +
Duomenys atvaizduojami surikiuoti pagal specialistą ir tada pagal kliento numerį (švieslentės puslapis) +
Yra funkcija įrašymui į localStorage (administravimo puslapis) +
Yra funkcija kliento ištrynimui iš objekto (mygtukas Aptarnauta)(specialisto puslapis) +
Duomenų filtravimas: pasirinkimas, kokio specialisto klientus aptarnauti (specialisto puslapis) +
Gražesnis dizainas panaudojant CSS (švieslentės puslapis) +

2 Lygis:

Švieslentės puslapis, skirtas rodyti greitai sulauksiančius klientus (aukščiausiai pas specialistą – reiškia klientui eiti; nerodo scrollbar, net jei netelpa į ekraną) -
Lankytojo puslapis, kur jis mato laiką iki savo eilės (nebūtina žiūrėti į švieslentę) -
Specialistui aptarnavus klientą, vietoj duomenų ištrynimo, pažymima, kad klientas aptarnautas -
Švieslentėje fono spalva išskiriamas dabar aptarnaujamas klientas (pirmas elementas pagal specialistą) -
Švieslentėje žemiau rodomi tik neaptarnauti klientai (tie kuriems nebuvo paspaustas mygtukas Aptarnauta) -
Yra funkcija apskaičiavimui, kiek truko apsilankymas (galima senus apsilankymų laikus saugoti atskirame objekte localStorage) -
Švieslentėje rodoma, kiek laiko liko klientui laukti (vidurkis pagal laukimo laiką per specialistą) -
Lankytojo puslapyje numatomas laikas patikslinamas kas 5s (JavaScript arba HTML meta) -
Lankytojas, įvedęs savo numerį formoje, mato tik jam skirtą laukti laiką (lankytojo puslapis) -
Švieslentės puslapis yra pritaikytas rodyti per visą ekraną (CSS) -
Užregistravus naują klientą rodoma Užregistruota sėkmingai -
Neradus pradinių duomenų failo (AJAX užklausa) rodoma Nepavyko nuskaityti lankytojų duomenų -
Yra pritaikyta greitam naujų lankytojų įvedimui (JavaScript focus) -
Naudojamas gražesnis dizainas (Pvz: google Material UI, Bootstrap) -
