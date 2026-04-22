using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using PaymentApp.Data;
using PaymentApp.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowAngular");

// AUTO MIGRATION
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var databaseCreator = db.Database.GetService<IRelationalDatabaseCreator>();

    if (!databaseCreator.HasTables())
    {
        db.Database.EnsureCreated();
    }
}

// MAP ENDPOINTS
app.MapPaymentDetailEndpoints();

app.Run();