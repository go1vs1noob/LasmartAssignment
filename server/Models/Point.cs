using System.Drawing;

namespace server.Models;

public class Point
{
    public int Id { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Radius { get; set; }
    public string ColorHex { get; set; }
    public IList<Comment> Comments { get; set; } = new List<Comment>();
}
