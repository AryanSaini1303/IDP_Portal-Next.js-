
# IDP Portal

Welcome to the IDP Portal! This application is designed to streamline the process of registering for interdisciplinary projects (IDP) at educational institutions. It allows students to easily register for projects, form teams based on various criteria, and manage their participation under the guidance of teachers.

## 🚀 Features

- **Student Registration**: Students can register for projects and view available opportunities.
- **Team Formation**: The system automatically forms teams based on predefined criteria, ensuring balanced and diverse teams.
- **Project Management**: Teachers can oversee and manage project registrations and team formations.
- **Random Team Generation**: Teams are formed randomly based on specific criteria to promote diverse group dynamics.
- **Patent Protection**: The project has been filed for a patent, highlighting its innovative approach and technical uniqueness.

## 🛠️ Technologies Used

- **Frontend**: Developed using Next.js for a seamless and responsive user experience.
- **Backend**: Utilizes a robust backend built with Next.js to handle API requests and manage data.
- **Database**: Integrated with a PostgreSQL database to store and manage project and user data efficiently.
- **Prisma ORM**: Employed for seamless database interactions and schema management.

## 📦 Installation

To run the IDP Portal locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AryanSaini1303/IDP_Portal-Next.js-.git
   cd IDP_Portal-Next.js-
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your environment variables:

   ```env
   POSTGRES_PRISMA_URL=your_postgres_url
   POSTGRES_URL_NON_POOLING=your_non_pooling_postgres_url
   ```
4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:3000` in your browser to view the application.

## 📋 Usage

- **For Students**: Register for projects, view available projects, and automatically form teams.
- **For Teachers**: Manage project registrations, oversee team formations, and view project and student data.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
3. **Commit Your Changes**
4. **Push to the Branch**
5. **Submit a Pull Request**

## 📝 License

This project is licensed.

## 🧩 Future Enhancements

- **Enhanced Team Formation Algorithms**: Implement more sophisticated algorithms for team formation.
- **User Analytics**: Add analytics to track student and project metrics.
- **Advanced Search Filters**: Improve project search capabilities with more filters.
