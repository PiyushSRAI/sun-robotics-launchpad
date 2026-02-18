# Stage 1: Build the application
FROM maven:3.9-amazoncorretto-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build the JAR inside the container (skips tests to save time)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM amazoncorretto:17
WORKDIR /app
# Copy the built jar from the previous stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]