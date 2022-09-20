import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import Moralis from "moralis-v1/node.js";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(8000, () => {});
}
bootstrap();
