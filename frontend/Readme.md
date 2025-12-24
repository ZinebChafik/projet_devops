
### 3D :

Sur notre site web, nous avons intégré une sphère en 3D réalisée grâce à la bibliothèque Three.js. Cette solution permet de concevoir et de manipuler des objets tridimensionnels de manière efficace et élégante. En recourant à Three.js, nous exploitons un ensemble de concepts essentiels à la création d'environnements 3D, notamment la gestion de la scène, le rendu via le renderer, la définition de géométries complexes ainsi que la mise en place d’éclairages sophistiqués.

Par ailleurs, Three.js introduit également des notions avancées telles que le raycaster, qui facilite la détection des interactions entre le curseur et les objets 3D, ainsi que la manipulation de meshes et de matériaux, indispensables pour conférer aux objets leur aspect et leur texture spécifiques. Cette approche intégrée et polyvalente renforce l’expérience utilisateur en offrant une immersion innovante et en illustrant parfaitement le potentiel des technologies 3D dans le développement web.

### Fonctionnement du sphére 3D:
Dans notre projet, nous avons exploité Three.js pour créer une représentation 3D de la Terre. Nous avons utilisé la classe SphereGeometry afin de définir la géométrie sphérique du globe, puis nous y avons appliqué une texture représentant une image des sept continents. Cette approche permet d'obtenir une représentation réaliste et immersive du monde.

Par ailleurs, nous avons intégré des étiquettes positionnées de manière absolue pour apparaître sur le globe. Chaque étiquette comporte un attribut data-url, construit à partir de l'URL du site web, de la route correspondant aux pays ainsi que de l'identifiant associé. Cet identifiant sera par la suite récupéré au sein du composant dédié aux pays, facilitant ainsi la navigation et l'interaction avec l'interface.

Enfin, pour enrichir la scène, nous avons ajouté des étoiles, modélisées en tant qu'objets 3D. La position de ces étoiles est générée de manière aléatoire grâce à des fonctions mathématiques qui font appel à la librairie Math de JavaScript et à ses méthodes cos, sin et random. Ces méthodes permettent de déterminer les coordonnées x, y et z de chaque point dans notre environnement 3D, contribuant ainsi à l'aspect dynamique et réaliste de la scène.
---------------------------------
### API and Database modeling or schema:
- Dans le cadre de notre développement avec Django, nous avons structuré le site web en deux modèles principaux. Le premier modèle représente les continents et comprend des attributs essentiels tels que le nom et la description. Le second modèle, dédié aux pays, intègre l’ensemble des champs mentionnés par Zineb et inclut, de surcroît, une clé étrangère pointant vers le continent correspondant. Cette relation établit un lien direct entre chaque pays et son continent associé, assurant ainsi une cohérence et une intégrité dans l’organisation des données.
- Dans un second temps, nous avons exploité Django REST Framework afin de sérialiser les données au format JSON, ce qui permet une lecture aisée via l'URL de l'API par Angular. Pour ce faire, nous avons défini deux serializers principaux : l'un dédié aux données des continents et l'autre à celles des pays.Le serializer relatif aux continents intègre notamment l'identifiant, le nom et la description de chaque continent, ainsi qu'un tableau regroupant l'ensemble des pays présents dans notre base de données. Ce mécanisme assure une représentation claire et structurée des relations entre continents et pays, facilitant ainsi l'interaction entre le backend et le frontend de notre application.
- ![image](https://github.com/user-attachments/assets/7df5e616-1d22-40ff-9c05-71a1c8a16b05)

