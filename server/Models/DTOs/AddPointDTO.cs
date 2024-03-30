using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs;

public class AddPointDTO
{
    [Required]
    public int X { get; set; }
    [Required]
    public int Y { get; set; }
    [Required]
    public int Radius { get; set; }
    [Required]
    public string ColorHex { get; set; }
}